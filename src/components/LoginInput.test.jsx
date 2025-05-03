/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginInput from './LoginInput.jsx';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );
    const emailInput = await screen.findByPlaceholderText('Isi email mu');

    // Action
    await userEvent.type(emailInput, 'test@email.com');

    // Assert
    expect(emailInput).toHaveValue('test@email.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput login={() => {}} />
      </MemoryRouter>
    );
    const passwordInput = await screen.findByPlaceholderText('Isi paswordmu');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <MemoryRouter>
        <LoginInput login={mockLogin} />
      </MemoryRouter>
    );

    const emailInput = await screen.findByPlaceholderText('Isi email mu');
    const passwordInput = await screen.findByPlaceholderText('Isi paswordmu');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Action
    await userEvent.type(emailInput, 'tester@mail.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'tester@mail.com',
      password: '123456',
    });
  });
});