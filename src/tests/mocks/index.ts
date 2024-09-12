import {faker} from '@faker-js/faker';
import {User} from "../../core/entities/User";
import {Task} from "../../core/entities/Task";

export default class MockHelperUtils {
    static generateMockUser(): User {
        const id_ = faker.database.mongodbObjectId()
        return {
            _id: id_,
            username: faker.internet.userName(),
            email: faker.internet.email()
        };
    }

    static generateMockTask({ownerId, assigneeId, dueDate}: { ownerId?: string, assigneeId?: string, dueDate?: string }): Task {
        const id_ = faker.database.mongodbObjectId()
        return {
            _id: id_,
            name: faker.lorem.words(3),
            assigneeId: assigneeId || faker.database.mongodbObjectId(),
            dueDate: dueDate || faker.date.future().toString(),
            state: faker.lorem.words(1),
            description: faker.lorem.paragraph(),
            ownerId: ownerId || faker.database.mongodbObjectId()
        };

    }
}