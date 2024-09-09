import upcomingTaskImage from "../assets/images/dashboard/upcoming_task.svg"
import todayTaskImage from "../assets/images/dashboard/today_task.svg"
import pastDueTaskImage from "../assets/images/dashboard/past_due_task.svg"


export enum MenuTaskLayoutListCategory {
    TODAY = "Today",
    TOMORROW = "Tomorrow",
    UPCOMING = "Upcoming",
    PAST_DUE = "Past Due",
}


export enum TaskStateColorType {
    PENDING = "accent1",
    REJECTED = "accent2",
    IN_PROGRESS = "accent3",
    COMPLETED = "accent4"
}

export const menuTaskLayoutListCategoryData = [{
    name: MenuTaskLayoutListCategory.TODAY,
    icon: todayTaskImage
},
    {
        name: MenuTaskLayoutListCategory.TOMORROW,
        icon: upcomingTaskImage
    },
    {
        name: MenuTaskLayoutListCategory.UPCOMING,
        icon: upcomingTaskImage
    },
    {
        name: MenuTaskLayoutListCategory.PAST_DUE,
        icon: pastDueTaskImage
    }]