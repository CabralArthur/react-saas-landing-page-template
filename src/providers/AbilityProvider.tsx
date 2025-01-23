import React from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility, defineAbilityFor } from '../config/ability';
import { useUserStore } from '../stores/user.store';

export const AbilityContext = React.createContext<AppAbility>(null!);

export const Can = createContextualCan(AbilityContext.Consumer);

export const AbilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const ability = React.useMemo(() => defineAbilityFor(userInfo), [userInfo]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}; 