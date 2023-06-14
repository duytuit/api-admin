import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateProjectDto, UpdateProjectDto } from './dto/req-project.dto';

@Controller('system/projects')
@Public()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.addOrUpdate(createProjectDto);
  }

  @Post('update')
  update(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.addOrUpdate(updateProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
