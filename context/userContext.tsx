import { createContext, PropsWithChildren, useState } from "react";

type ContextUser = {
  name: string;
}

interface IUserContext {
  user: ContextUser | undefined;
  handleSetUser: (user: any) => void;
}

const defaultUserContextValue: IUserContext = {
  user: undefined,
  handleSetUser: () => null,
};

export const UserContext = createContext(defaultUserContextValue)

export default function UserContextProvider({ children }: PropsWithChildren) {
  const [contextUser, setContextUser] = useState<ContextUser>({ name: 'Mock Name' });

  const handleSetUser = (user: any) => {
    setContextUser(user);
  }

  const context: IUserContext = {
    user: contextUser,
    handleSetUser
  }

  return (
    <UserContext.Provider value={context}> { children }</UserContext.Provider>
  )
}