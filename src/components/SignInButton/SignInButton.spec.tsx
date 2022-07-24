import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { createMock } from 'ts-jest-mock';

import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('SignInButton Component', () => {
  it('renders correctly when user is not logged in', () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValue({data: null, status: "unauthenticated"});

    render(
      <SignInButton />
    );

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
  });

  it('renders correctly when user is logged in', () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: {
          name: 'John Doe',
          email: "john.doe@mail.com"
        },
        expires: new Date().toString()
      }, 
      status: "authenticated"
    });

    render(
      <SignInButton />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});