import {useSelector} from 'react-redux';
import {RootState} from "../../../../infrastructure/state/store";
import {MenuTaskLayoutListCategory} from "../../configs/dashboard";


const useTasksSelectFromCategory = (categoryName: string) => {

    return useSelector((state: RootState) => {
        switch (categoryName) {
            case MenuTaskLayoutListCategory.TODAY:
                return state.tasks.tasksToday
            case MenuTaskLayoutListCategory.PAST_DUE:
                return state.tasks.tasksPastDue
            case MenuTaskLayoutListCategory.TOMORROW:
                return state.tasks.tasksTomorrow
            case MenuTaskLayoutListCategory.UPCOMING:
                return state.tasks.tasksAfterTomorrow
        }
    });
};

export default useTasksSelectFromCategory;