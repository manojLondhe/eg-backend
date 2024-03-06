import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { PcrscoresService } from './pcrscores.service';

@Controller('pcrscores')
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
export class PcrscoresController {
	constructor(private readonly pcrscoresService: PcrscoresService) {}

	@Post('/create')
	@UseGuards(AuthGuard)
	create(@Req() request: any, @Body() body: any, @Res() response: any) {
		return this.pcrscoresService.create(body, request, response);
	}

	@Post('/list')
	@UseGuards(AuthGuard)
	pcrscoreList(@Req() request: any, @Body() body: any, @Res() response: any) {
		return this.pcrscoresService.pcrscoreList(body, request, response);
	}

	@Post('/:id')
	@UseGuards(AuthGuard)
	pcrscoreById(
		@Req() request: any,
		@Body() body: any,
		@Param('id') id: number,
		@Res() response: any,
	) {
		return this.pcrscoresService.pcrscoreById(id, body, request, response);
	}

	@Get('/:user_id')
	@UseGuards(AuthGuard)
	pcrscoreByUser_id(
		@Req() request: any,
		@Body() body: any,
		@Param('user_id') user_id: number,
		@Res() response: any,
	) {
		return this.pcrscoresService.pcrscoreByUser_id(
			user_id,
			body,
			request,
			response,
		);
	}

	@Patch('/:id')
	@UseGuards(AuthGuard)
	update(
		@Req() request: any,
		@Body() body: any,
		@Param('id') id: number,
		@Res() response: any,
	) {
		return this.pcrscoresService.update(id, body, request, response);
	}
}
