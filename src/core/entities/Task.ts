import {User} from "./User";

export enum TaskStateEnum {
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export interface Task {
    _id?: string;
    name: string;
    ownerId: User;
    assigneeId: User;
    state?: TaskStateEnum;
    description?: string;
    dueDate?: string;
    createdAt?: string;
    updatedAt?: string;
}
