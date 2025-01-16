import { Tasks } from './Tasks';
import { useAuth } from '@/hooks/useAuth'

const TasksContainer = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Tasks onLogoutClick={logout} />
    </div>
  )
}

export default TasksContainer;
