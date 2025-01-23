import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import type { MongoAbility } from '@casl/ability';
import type { UserInfo } from '../stores/user.store';

export type Subjects = 'TEAM' | 'PROFILE' | 'HOME';
export type Actions = 'READ';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export function defineAbilityFor(userInfo: UserInfo | null) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (!userInfo) {
        return build();
    }

    if (userInfo.isAdmin) {
        can('READ', 'TEAM');
    }

    userInfo.permissions.forEach(({ name, module }) => {
        can(name as Actions, module as Subjects);
    });

    can('READ', 'HOME');
    can('READ', 'PROFILE');

  return build();
}

export const defaultAbility = defineAbilityFor(null); 