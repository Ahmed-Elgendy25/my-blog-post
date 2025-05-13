import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignUpContainer from '../SignUpContainer'

describe('SignUpContainer', () => {
  it('renders all form fields correctly', () => {
    render(<SignUpContainer />)

    // Check for all input fields by their placeholders
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('firstname')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('lastname')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('confirmpassword')).toBeInTheDocument()

    // Check for role checkboxes
    expect(screen.getByLabelText('User')).toBeInTheDocument()
    expect(screen.getByLabelText('Author')).toBeInTheDocument()

    // Check for file upload
    expect(screen.getByText('Upload Profile Image')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Upload')).toBeInTheDocument()

    // Check for submit button
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
  })

  it('shows validation errors when form is submitted without filling the form', async () => {
    render(<SignUpContainer />)
    
    const submitButton = screen.getByRole('button', { name: /sign up/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      // Use getAllByText and check for specific error messages
      const errorMessages = screen.getAllByText(/required|invalid/i)
      expect(errorMessages).toHaveLength(6) // Total number of validation messages
      
      // Check for specific error messages
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
      expect(screen.getByText('Confirm password is required')).toBeInTheDocument()
      expect(screen.getByText('At least one role is required')).toBeInTheDocument()
    })
  })

  it('shows validation errors when form is submitted with invalid data', async () => {
    render(<SignUpContainer />)

    const emailInput = screen.getByPlaceholderText('email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
  })
})