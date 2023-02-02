import * as moment from 'moment';

import {
  EntitySubscriberInterface,
  EventSubscriber,
  ObjectLiteral,
  UpdateEvent,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    updateVerifiedDate(event.entity!);
  }
}

const updateVerifiedDate = async (user: ObjectLiteral) => {
  console.log('user');
  console.log(user);
  if (user.role > 1) {
    user.verifiedDate = moment();
  }
};
