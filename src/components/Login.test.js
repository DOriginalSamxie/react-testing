import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from './Login'

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: 'Samad' },
    }),
  },
}))

test('username input should be rendered', () => {
  render(<Login />)
  const userInputEl = screen.getByPlaceholderText(/username/i)
  expect(userInputEl).toBeInTheDocument()
})

test('password input should be rendered', () => {
  render(<Login />)
  const passwordInputEl = screen.getByPlaceholderText(/password/i)
  expect(passwordInputEl).toBeInTheDocument()
})

test('button  should be rendered', () => {
  render(<Login />)
  const buttonInputEl = screen.getByRole('button')
  expect(buttonInputEl).toBeInTheDocument()
})

test('username input should be empty', () => {
  render(<Login />)
  const userInputEl = screen.getByPlaceholderText(/username/i)
  expect(userInputEl.value).toBe('')
})

test('password input should be empty', () => {
  render(<Login />)
  const passwordInputEl = screen.getByPlaceholderText(/password/i)
  expect(passwordInputEl.value).toBe('')
})

test('button  should be disabled', () => {
  render(<Login />)
  const buttonInputEl = screen.getByRole('button')
  expect(buttonInputEl).toBeDisabled()
})

test('loading should not be rendered', () => {
  render(<Login />)
  const buttonInputEl = screen.getByRole('button')
  expect(buttonInputEl).not.toHaveTextContent(/please wait/i)
})

test('error message should not be visible', () => {
  render(<Login />)
  const errorEl = screen.getByTestId('error')
  expect(errorEl).not.toBeVisible()
})

test('username input should change', () => {
  render(<Login />)
  const usernameInputEl = screen.getByPlaceholderText(/username/i)
  const testValue = 'test'
  fireEvent.change(usernameInputEl, { target: { value: testValue } })
  expect(usernameInputEl.value).toBe(testValue)
})

test('password input should change', () => {
  render(<Login />)
  const passwordInputEl = screen.getByPlaceholderText(/password/i)
  const testValue = 'test'
  fireEvent.change(passwordInputEl, { target: { value: testValue } })
  expect(passwordInputEl.value).toBe(testValue)
})

test('button  shoul dnot be disabled when user exist', () => {
  render(<Login />)
  const buttonInputEl = screen.getByRole('button')
  const usernameInputEl = screen.getByPlaceholderText(/username/i)
  const passwordInputEl = screen.getByPlaceholderText(/password/i)
  const testValue = 'test'
  fireEvent.change(usernameInputEl, { target: { value: testValue } })
  fireEvent.change(passwordInputEl, { target: { value: testValue } })

  expect(buttonInputEl).not.toBeDisabled()
})

test('loading should be rendered when clicked', () => {
  render(<Login />)
  const buttonInputEl = screen.getByRole('button')
  const usernameInputEl = screen.getByPlaceholderText(/username/i)
  const passwordInputEl = screen.getByPlaceholderText(/password/i)
  const testValue = 'test'
  fireEvent.change(usernameInputEl, { target: { value: testValue } })
  fireEvent.change(passwordInputEl, { target: { value: testValue } })
  fireEvent.click(buttonEl)
  expect(buttonInputEl).toHaveTextContent(/please wait/i)
})

test('loading should not be rendered after fetching', async () => {
  render(<Login />)
  const buttonInputEl = screen.getByRole('button')
  const usernameInputEl = screen.getByPlaceholderText(/username/i)
  const passwordInputEl = screen.getByPlaceholderText(/password/i)
  const testValue = 'test'
  fireEvent.change(usernameInputEl, { target: { value: testValue } })
  fireEvent.change(passwordInputEl, { target: { value: testValue } })
  fireEvent.click(buttonEl)
  await waitFor(() =>
    expect(buttonInputEl).not.toHaveTextContent(/please wait/i)
  )
})
