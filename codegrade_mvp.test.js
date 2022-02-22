import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer, getHandlers } from './backend/mock-server'
import App from './frontend/components/App'

jest.setTimeout(750) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 150 }
const queryOptions = { exact: false }

const renderApp = ui => {
  window.history.pushState({}, 'Test page', '/')
  document.body.innerHTML = ''
  return render(ui)
}
let server
beforeAll(() => {
  server = setupServer(...getHandlers())
  server.listen()
})
afterAll(() => {
  server.close()
})
beforeEach(() => {
  renderApp(<App />)
})
afterEach(() => {
  server.resetHandlers(...getHandlers())
})

const LoginLink = () => document.querySelector('#loginScreen')
const ArticlesLink = () => document.querySelector('#articlesScreen')
const PrivateLink = () => document.querySelector('#privateScreen')
const usernameInput = () => document.querySelector('#usernameInput')
const passwordInput = () => document.querySelector('#passwordInput')
const loginBtn = () => document.querySelector('#submitCredentials')

describe('Advanced Applications', () => {
  beforeEach(async () => {
    fireEvent.change(usernameInput(), { target: { value: 'Foo' } })
    fireEvent.change(passwordInput(), { target: { value: '12345678' } })
    fireEvent.click(loginBtn())
    await screen.findByText('Blah blah closures', queryOptions, waitForOptions)
  })
  describe('[LOGIN]', () => {
    test('sanity', async () => {
      await screen.findByText('Blah blah closures', queryOptions, waitForOptions)
      await screen.findByText('Blah blah hooks', queryOptions, waitForOptions)
      await screen.findByText('Blah blah express', queryOptions, waitForOptions)
    })
  })
})
