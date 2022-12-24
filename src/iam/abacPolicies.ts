import { PERMISSIONS, ROLES, TASK_STATUSES, VALID_PERMISSIONS } from '../constants';
import type { AuthUser, AuthedRequest, Task } from '../types';
import { UserError } from '../utilMiddleware/errorHandler';

/**
 * this is a map of permissions to policies
 * the key is the permission, the value is the policy
 * not all permissions need a policy, but some do
 * if the permission does not have a policy, it is considered to be always allowed
 * this way we have to write policies only for the permissions that need them
 */
export const abacPolicies = new Map<typeof VALID_PERMISSIONS[number], (req: AuthedRequest) => void>();

/** 
 * this is example of a policy: function that takes a request (with user added by authMiddleware)
 * the policy can query the database, or do any other logic to determine if the user is allowed to do the action
 * if the user is not allowed, the function should throw an error
 */
function taskUpdatePolicy(req: AuthedRequest) {
  const { user, body } = req;

  const { status } = body as Task;
  // if the status is not being updated, we don't need to run the policy
  if (!status) {
    return;
  }
  const { role } = user as AuthUser;
  // should never happens
  if (!role) {
    throw new Error('Missing role');
  }

  // admin can do anything
  if (role === ROLES.admin) {
    return;
  }


  if (role == ROLES.user && status === TASK_STATUSES.inProgress) {
    return;
  }
  throw new UserError(`Forbidden to set status:${status}`, 403);
}

abacPolicies.set(PERMISSIONS.taskUpdate, taskUpdatePolicy);
