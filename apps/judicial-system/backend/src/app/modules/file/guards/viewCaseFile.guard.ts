import {
  Injectable,
  CanActivate,
  ExecutionContext,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common'

import {
  CaseState,
  completedCaseStates,
  isCourtRole,
  isProsecutionRole,
  User,
} from '@island.is/judicial-system/types'

import { Case } from '../../case'

@Injectable()
export class ViewCaseFileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const user: User = request.user

    if (!user) {
      throw new InternalServerErrorException('Missing user')
    }

    const theCase: Case = request.case

    if (!theCase) {
      throw new InternalServerErrorException('Missing case')
    }

    // Prosecutors have permission to view all case files
    if (isProsecutionRole(user.role)) {
      return true
    }

    // Judges and registrars have permission to view files of submitted and
    // completed cases
    if (
      isCourtRole(user.role) &&
      [
        CaseState.SUBMITTED,
        CaseState.RECEIVED,
        ...completedCaseStates,
      ].includes(theCase.state)
    ) {
      return true
    }

    // Other users do not have permission to view any case files
    throw new ForbiddenException(`Forbidden for ${user.role}`)
  }
}
