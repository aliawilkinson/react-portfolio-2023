import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

/**
 * Renders a component wrapped in necessary providers for testing.
 * Includes MemoryRouter for components that need routing context.
 *
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Options for rendering
 * @param {string} options.route - Initial route (defaults to '/')
 * @returns {Object} - The result of render() from @testing-library/react
 */
export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
    options
  )
}
