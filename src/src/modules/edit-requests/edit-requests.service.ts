import { HasuraService as HasuraServiceFromServices } from '../../services/hasura/hasura.service';
import { HasuraService } from '../../hasura/hasura.service';
import { Injectable, Res, Req } from '@nestjs/common';
import { EditRequestCoreService } from './edit-requests.core.service';
import { EditRequestDto } from './edit-requests.dto';
@Injectable()
export class EditRequestService {
	constructor(
		private hasuraServiceFromServices: HasuraServiceFromServices,
		private hasuraService: HasuraService,
		private editRequestCoreService: EditRequestCoreService,
	) {}
	public returnField = [
		'id',
		'edit_req_for_context',
		'edit_req_for_context_id',
		'fields',
		'req_date',
		'req_approved_date',
		'program_id',
		'academic_year_id',
		'status',
		'edit_req_approved_by',
	];
	public async createEditRequest(req, body, res) {
		const edit_req_approved_by = req.mw_userid;
		let program_id = body?.program_id || 1;
		let academic_year_id = body?.academic_year_id || 1;

		const response = await this.editRequestCoreService.getEditRequest(
			body.edit_req_for_context_id,
			body.edit_req_for_context,
			program_id,
			academic_year_id,
		);

		if (response.data.edit_requests.length > 0) {
			return res.status(200).json({
				success: true,
				message: 'Learner has used up its chance',
				data: {},
			});
		} else {
			const result = await this.editRequestCoreService.createEditRequest(
				body,
				edit_req_approved_by,
				program_id,
				academic_year_id,
			);
			return res.status(200).json({
				success: true,
				message: 'EditRequest saved successfully',
				data: result,
			});
		}
	}
	public async getEditRequestList(req, body, res) {
		const edit_req_approved_by = req.mw_userid;
		const response = await this.editRequestCoreService.getEditRequestList(
			body,
			edit_req_approved_by,
		);
		return res.status(200).json({
			success: true,
			message: 'success',
			data: response.data.edit_requests,
		});
	}

	public async updateEditRequest(req: any, body: any, res: any) {
		const edit_req_approved_by = req.mw_userid;
		const response = await this.editRequestCoreService.getEditRequest(
			body.edit_req_for_context_id,
			body.edit_req_for_context,
			body?.program_id || 1,
			body?.academic_year_id || 1,
		);

		if (
			response.data.edit_requests.edit_req_approved_by !=
			edit_req_approved_by
		) {
			return res.status(200).json({
				success: false,
				message: 'Update request failed',
				data: [],
			});
		} else {
			const edit_requests_id = response.data.edit_requests[0].id;
			const updatedStatus = body.status;

			const result = await this.hasuraService.update(
				edit_requests_id,
				'edit_requests',
				{
					status: updatedStatus,
				},
				this.returnField,
			);
			return res.status(200).json({
				status: true,
				message: 'status updated successfully',
				data: [],
			});
		}
	}
}
