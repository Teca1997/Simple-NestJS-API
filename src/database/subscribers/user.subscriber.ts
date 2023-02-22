import * as moment from 'moment';

import { EntitySubscriberInterface, EventSubscriber, ObjectLiteral, UpdateEvent } from 'typeorm';

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
  if (user.role != undefined) return;
  if (user.role.id > 1) {
    user.verifiedDate = moment();
  } else {
    user.verifiedDate = null;
  }
  console.log(user);
};
