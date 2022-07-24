import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';
import { createMock } from 'ts-jest-mock';
import { SubscribeButton } from '.';

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('next-auth/react');

describe('SubscribeButton Component', () => {
  it('renders correctly', () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading',
    });

    render(
      <SubscribeButton />
    );

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects user to signIn when not authenticated', () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading',
    });

    const signInMocked = createMock(signIn);

    render(
      <SubscribeButton />
    );

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has subscription', () => {
    const useRouterMocked = createMock(useRouter);
    const useSessionMocked = createMock(useSession);

    const pushMocked = jest.fn();

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        user: {
          name: 'John Doe',
          email: "john.doe@mail.com"
        },
        activeSubscription: 'active',
        expires: new Date().toString()
      },
      status: "authenticated"
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked,
    } as any);

    render(
      <SubscribeButton />
    );

    const subscribeButon = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButon);

    expect(pushMocked).toHaveBeenCalledWith('/posts');
  });
});