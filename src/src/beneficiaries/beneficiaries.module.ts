import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BeneficiariesController } from './beneficiaries.controller';

import { HttpModule } from '@nestjs/axios';
import { S3Module } from 'src/services/s3/s3.module';
import { UploadFileModule } from 'src/upload-file/upload-file.module';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { EnumModule } from '../enum/enum.module';
import { HasuraModule } from '../hasura/hasura.module';
import { HelperModule } from '../helper/helper.module';
import { HasuraModule as HasuraModuleFromServices } from '../services/hasura/hasura.module';
import { KeycloakModule } from '../services/keycloak/keycloak.module';
import { BeneficiariesCoreService } from './beneficiaries.core.service';
import { BeneficiariesService } from './beneficiaries.service';
import { ProgramIdMiddleware } from 'src/common/middlewares/programId.middleware';
import { CohortMiddleware } from 'src/common/middlewares/cohort.middleware';
@Module({
	imports: [
		UserModule,
		HttpModule,
		HasuraModule,
		HelperModule,
		KeycloakModule,
		HasuraModuleFromServices,
		UploadFileModule,
		S3Module,
		EnumModule,
		UploadFileModule,
	],
	controllers: [BeneficiariesController],
	providers: [BeneficiariesService, BeneficiariesCoreService],
	exports: [BeneficiariesService, BeneficiariesCoreService],
})

export class BeneficiariesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes('*');
		consumer.apply(ProgramIdMiddleware)
		.exclude(
			'/beneficiaries',
			'/beneficiaries/admin/list/duplicates-by-aadhaar',
			'/beneficiaries/admin/list/deactivate-duplicates',
			'/beneficiaries/admin/list',
			'/beneficiaries/:id/is_enrollment_exists',
			'/beneficiaries/getStatusWiseCount',
			'/beneficiaries/admin/list/duplicate-count-by-aadhar',
			{ path: '/beneficiaries/:id', method: RequestMethod.GET },
			{ path: '/beneficiaries/:id', method: RequestMethod.DELETE },
			'/beneficiaries/register',
			'/beneficiaries/statusUpdate',
			'/beneficiaries/admin/statusUpdate',
			'/beneficiaries/admin/export-csv',
			'beneficiaries/admin/export-subjects-csv',
			'/beneficiaries/admin/verify-enrollment',
			'/beneficaries/update-Beneficiaires-aadhar/:id',

		).forRoutes(BeneficiariesController);
		consumer.apply(CohortMiddleware)
		.exclude(
			'/beneficiaries',
			'/beneficiaries/admin/list/duplicates-by-aadhaar',
			'/beneficiaries/admin/list/deactivate-duplicates',
			'/beneficiaries/admin/list',
			'/beneficiaries/:id/is_enrollment_exists',
			'/beneficiaries/getStatusWiseCount',
			'/beneficiaries/admin/list/duplicate-count-by-aadhar',
			{ path: '/beneficiaries/:id', method: RequestMethod.GET },
			{ path: '/beneficiaries/:id', method: RequestMethod.DELETE },
			'/beneficiaries/register',
			'/beneficiaries/statusUpdate',
			'/beneficiaries/admin/statusUpdate',
			'/beneficiaries/admin/export-csv',
			'beneficiaries/admin/export-subjects-csv',
			'/beneficiaries/admin/verify-enrollment',
			'/beneficaries/update-Beneficiaires-aadhar/:id',
			'/beneficiaries/admin/reassign'

		).forRoutes(BeneficiariesController);
	}
}
