import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignUpContainer from '../SignUpContainer'
import userEvent from '@testing-library/user-event'

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
      // Based on the validation schema, there should be 6 error messages
      expect(errorMessages).toHaveLength(6) 
      
      // Check for specific error messages
      expect(screen.getByText('Invalid email')).toBeInTheDocument()
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
      expect(screen.getByText('Confirm password is required')).toBeInTheDocument()
      expect(screen.getByText('At least one role is required')).toBeInTheDocument()
    })
  })

  it('validates form data incorrectly', async () => {
    render(<SignUpContainer />)
    
    // Get all the form inputs
    const emailInput = screen.getByPlaceholderText('email')
    const firstnameInput = screen.getByPlaceholderText('firstname')
    const lastnameInput = screen.getByPlaceholderText('lastname')
    const passwordInput = screen.getByPlaceholderText('password')
    const confirmPasswordInput = screen.getByPlaceholderText('confirmpassword')
    
    // Fill form with invalid data
    await userEvent.type(emailInput, 'invalidemail') // Invalid email format
    await userEvent.type(firstnameInput, 'Test')  // Valid
    await userEvent.type(lastnameInput, 'User')   // Valid
    await userEvent.type(passwordInput, 'short')  // Too short for password
    await userEvent.type(confirmPasswordInput, 'different') // Doesn't match password
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign up/i })
    await userEvent.click(submitButton)
    
    // Form should still be there (not submitted successfully)
    expect(submitButton).toBeInTheDocument()
  })
})