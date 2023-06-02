import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { SentryInterceptor } from 'src/common/interceptors/sentry.interceptor';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@UseInterceptors(SentryInterceptor)
@Controller('events')
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@Post('/create')
	@UseGuards(new AuthGuard())
	@UsePipes(ValidationPipe)
	create(
		@Body() createEventDto: CreateEventDto,
		@Req() header: Request,
		@Res() response: Response,
	) {
		return this.eventsService.create(createEventDto, header, response);
	}

	@Get('/list')
	@UseGuards(new AuthGuard())
	getEventsList(
		@Body() body: any,
		@Req() header: Request,
		@Res() response: Response,
	) {
		return this.eventsService.getEventsList(body, header, response);
	}

	@Post()
	findAll(@Body() request: Record<string, any>) {
		return this.eventsService.findAll(request);
	}

	@Get(':id')
	findOne(@Param('id') id: string, @Res() response: Response) {
		return this.eventsService.findOne(+id, response);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Req() header: Request,
		@Body() request: Record<string, any>,
		@Res() response: Response,
	) {
		return this.eventsService.update(+id, header, request, response);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.eventsService.remove(+id);
	}
}
