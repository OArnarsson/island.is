import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common'

import { ApiOkResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger'

import { ApplicationService } from './application.service'
import { ApplicationModel } from './models'

import { CreateApplicationDto, UpdateApplicationDto } from './dto'

import {
  CurrentHttpUser,
  JwtAuthGuard,
  RolesGuard,
  RolesRules,
  TokenGuard,
} from '@island.is/financial-aid/auth'
import type { User, StaffRoles } from '@island.is/financial-aid/shared'

// Allows only staff
const staffRule = 'veita'
// Allows only staff
const municipalityRule = 'hfj'

@Controller('api')
@ApiTags('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(TokenGuard)
  @Get('me')
  @ApiOkResponse({
    description:
      'Checks whether user has applied before and if it is the same month',
  })
  async getHasUserAppliedForCurrentMonth(
    @Query('nationalId') nationalId: string,
  ) {
    const hasApplied = await this.applicationService.hasUserAppliedForCurrentMonth(
      nationalId,
    )
    return hasApplied
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesRules(staffRule)
  @Get('applications')
  @ApiOkResponse({
    type: ApplicationModel,
    isArray: true,
    description: 'Gets all existing applications',
  })
  getAll(): Promise<ApplicationModel[]> {
    return this.applicationService.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get('applications/:id')
  @ApiOkResponse({
    type: ApplicationModel,
    description: 'Get application',
  })
  async getById(@Param('id') id: string) {
    const application = await this.applicationService.findById(id)

    if (!application) {
      throw new NotFoundException(`application ${id} not found`)
    }

    return application
  }

  @UseGuards(JwtAuthGuard)
  @Put('applications/:id')
  @ApiOkResponse({
    type: ApplicationModel,
    description: 'Updates an existing application',
  })
  async update(
    @Param('id') id: string,
    @Body() applicationToUpdate: UpdateApplicationDto,
  ): Promise<ApplicationModel> {
    const {
      numberOfAffectedRows,
      updatedApplication,
    } = await this.applicationService.update(id, applicationToUpdate)

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Application ${id} does not exist`)
    }

    return updatedApplication
  }

  @UseGuards(JwtAuthGuard)
  @Post('application')
  @ApiCreatedResponse({
    type: ApplicationModel,
    description: 'Creates a new application',
  })
  create(
    @CurrentHttpUser() user: User,
    @Body() application: CreateApplicationDto,
  ): Promise<ApplicationModel> {
    return this.applicationService.create(application, user)
  }
}
