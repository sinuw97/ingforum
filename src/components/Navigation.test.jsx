/**
 * skenario testing
 *
 * - Navigation component
 *   - renders user info and navigation links correctly
 *   - calls signOut function when logout button is clicked
 */

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation.jsx';

expect.extend(matchers);

describe('Navigation component', () => {
  afterEach(() => {
    cleanup();
  });

  const fakeUser = {
    id: 'user-1',
    name: 'Test user',
    avatar: 'https://example.com/avatar.jpg',
  };

  it('renders user info and navigation links correctly', () => {
    // Arrange
    render(
      <MemoryRouter>
        <Navigation authUser={fakeUser} signOut={() => {}} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Test user')).toBeInTheDocument();
    expect(screen.getByAltText('Test user')).toBeInTheDocument();
    expect(screen.getByText('Threads')).toBeInTheDocument();
    expect(screen.getByText('Leaderboards')).toBeInTheDocument();
  });

  it('calls signOut function when logout button is clicked', () => {
    // Arrange
    const mockSignOut = vi.fn();
    render(
      <MemoryRouter>
        <Navigation authUser={fakeUser} signOut={mockSignOut} />
      </MemoryRouter>
    );

    // Action
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);

    // Assert
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});