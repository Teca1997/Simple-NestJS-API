import { RoleEnum } from '../../enums/roles.enum';

export const RoleSeed = [
  {
    name: RoleEnum.RegisteredUser,
    description: 'User that did not verify their email adress.',
  },
  {
    name: RoleEnum.VerifiedUser,
    description: 'User that verified their email adress.',
  },
  {
    name: RoleEnum.Admin,
    description: 'System admin',
  },
];
