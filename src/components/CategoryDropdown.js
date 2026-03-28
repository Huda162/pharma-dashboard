/* eslint react/prop-types: 0 */

import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'

const CategoryDropdown = ({ onSelect }) => {
  const [categoriesByLevel, setCategoriesByLevel] = useState({ 0: [] })
  const [selectedCategories, setSelectedCategories] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState({})

  useEffect(() => {
    fetchCategories(0, 0)
  }, [])

  const fetchCategories = async (parentId, level) => {
    try {
      const response = await axios.get(`${API_ROUTE}/sub_categories/${parentId}`)
      const categories = response.data.categories || []
      setCategoriesByLevel((prev) => ({
        ...prev,
        [level]: categories,
      }))
      return categories
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  const handleSelectCategory = async (category, level) => {
    const newSelectedCategories = selectedCategories.slice(0, level)
    newSelectedCategories[level] = category
    setSelectedCategories(newSelectedCategories)

    const children = await fetchCategories(category.id, level + 1)

    if (Array.isArray(children) && children.length > 0) {
      setCategoriesByLevel((prev) => ({
        ...prev,
        [level + 1]: children,
      }))
    } else {
      setCategoriesByLevel((prev) => ({
        ...prev,
        [level + 1]: [],
      }))
    }
    console.log(newSelectedCategories)
    const lastSelectedCategory = newSelectedCategories[newSelectedCategories.length - 1]
    onSelect(lastSelectedCategory)
  }

  const toggleDropdown = (level) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [level]: !prev[level],
    }))
  }

  const renderDropdown = (categories, level) =>
    categories.length > 0 && (
      <Dropdown
        style={{ marginTop: '1rem' }}
        isOpen={dropdownOpen[level] || false}
        toggle={() => toggleDropdown(level)}
        key={level}
      >
        <DropdownToggle caret>{selectedCategories[level]?.name_ar || 'اختر قسم'}</DropdownToggle>
        <DropdownMenu>
          {categories.map((category) => (
            <DropdownItem key={category.id} onClick={() => handleSelectCategory(category, level)}>
              {category.name_ar}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )

  return (
    <div>
      {Object.keys(categoriesByLevel).map((level) =>
        renderDropdown(categoriesByLevel[level], parseInt(level, 10)),
      )}
    </div>
  )
}

export default CategoryDropdown
