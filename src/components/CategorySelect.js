/* eslint-disable react/prop-types */
import React from 'react'
import { CFormLabel } from '@coreui/react'
import { Menu, MenuButton, MenuItem, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useEffect, useState } from 'react'
import LabelWithAsterisk from './LabelWithAsterist'

const CategorySelect = ({ categories, value, onChange }) => {
  const [categoryTree, setCategoryTree] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (value && Array.isArray(value)) {
      const selected = categories.filter((cat) => value.includes(cat.id))
      setSelectedCategories(selected)
    }
  }, [value, categories])

  useEffect(() => {
    const buildCategoryTree = (parentId = 0) => {
      return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => ({
          ...category,
          children: buildCategoryTree(category.id),
        }))
    }

    setCategoryTree(buildCategoryTree())
  }, [categories])

  const hasSelectedChildren = (category) => {
    if (!category.children || category.children.length === 0) return false

    const directChildSelected = category.children.some((child) =>
      selectedCategories.some((selected) => selected.id === child.id),
    )

    const deepChildSelected = category.children.some((child) => hasSelectedChildren(child))

    return directChildSelected || deepChildSelected
  }

  const getCategoryPath = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return ''

    const path = []
    let currentCategory = category

    while (currentCategory) {
      path.unshift(currentCategory.name_ar)

      const parent = categories.find((cat) => cat.id === currentCategory.parent_id)
      if (!parent) break

      currentCategory = parent
    }

    return path.join(' > ')
  }

  const handleCategoryToggle = (categoryId, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation()
    }

    const category = categories.find((cat) => cat.id === categoryId)
    if (!category) return

    let newSelectedCategories
    const isAlreadySelected = selectedCategories.some((cat) => cat.id === categoryId)

    if (isAlreadySelected) {
      newSelectedCategories = selectedCategories.filter((cat) => cat.id !== categoryId)
    } else {
      newSelectedCategories = [...selectedCategories, category]
    }

    setSelectedCategories(newSelectedCategories)

    if (onChange) {
      onChange({
        value: newSelectedCategories.map((cat) => cat.id),
      })
    }
  }

  const removeCategory = (categoryId, e) => {
    e.stopPropagation()

    const newSelectedCategories = selectedCategories.filter((cat) => cat.id !== categoryId)
    setSelectedCategories(newSelectedCategories)

    if (onChange) {
      onChange({
        value: newSelectedCategories.map((cat) => cat.id),
      })
    }
  }

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isSelected = selectedCategories.some((cat) => cat.id === item.id)
      const hasChildrenSelected = hasSelectedChildren(item)

      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.id}
            label={
              <span>
                {item.name_ar}
                {(isSelected || hasChildrenSelected) && ' ✓'}
              </span>
            }
            direction="left"
            menuClassName="rtl-submenu"
            className="rtl-submenu"
          >
            <MenuItem
              value={item.id}
              onClick={(e) => {
                e.stopPropagation = true
                e.keepOpen = true
                handleCategoryToggle(item.id, e)
              }}
              className={isSelected ? 'menu-item-selected' : ''}
            >
              {item.name_ar} (الكل)
              {isSelected && ' ✓'}
            </MenuItem>
            {renderMenuItems(item.children)}
          </SubMenu>
        )
      }
      return (
        <MenuItem
          key={item.id}
          value={item.id}
          onClick={(e) => {
            e.keepOpen = true
            handleCategoryToggle(item.id, e)
          }}
          className={isSelected ? 'menu-item-selected' : ''}
        >
          {item.name_ar}
          {isSelected && ' ✓'}
        </MenuItem>
      )
    })
  }

  const buttonText =
    selectedCategories.length > 0
      ? `تم اختيار ${selectedCategories.length} تصنيفات`
      : 'اختر تصنيف المنتج'

  return (
    <div className="category-select-container mt-1">
      <LabelWithAsterisk labelText="تصنيف المنتج" />

      <Menu
        menuButton={
          <MenuButton className="menu-button">
            {buttonText}
            <span className="dropdown-arrow">▼</span>
          </MenuButton>
        }
        direction="left"
        align="end"
        position="anchor"
        menuClassName="rtl-menu"
        transition
        onItemClick={() => setMenuOpen(true)}
        onMenuChange={(e) => setMenuOpen(true)}
      >
        {renderMenuItems(categoryTree)}
      </Menu>

      {selectedCategories.length > 0 && (
        <div className="selected-categories-chips mt-2">
          {selectedCategories.map((category) => (
            <span key={category.id} className="category-chip">
              {getCategoryPath(category.id)}
              <button
                type="button"
                className="chip-remove-btn"
                onClick={(e) => removeCategory(category.id, e)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategorySelect
