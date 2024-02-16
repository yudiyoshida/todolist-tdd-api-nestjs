import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';

import { ClientError, ServerError } from '../errors/error.entity';

type swaggerProps = {
  tags: string[];
  summary: string;
  okResponse?: any;
  createdResponse?: any;
  applyBadRequest?: boolean;
  applyConflict?: boolean;
  applyNotFound?: boolean;
  applyUnsupportedMediaType?: boolean;
}

export function Swagger(props: swaggerProps) {
  return applyDecorators(
    ApiTags(...props.tags),
    ApiOperation({ summary: props.summary }),

    applyOkResponse(props.okResponse),
    applyCreatedResponse(props.createdResponse),
    applyBadRequestResponse(props.applyBadRequest),
    applyNotFoundResponse(props.applyNotFound),
    applyConflictResponse(props.applyConflict),
    applyUnsupportedMediaTypeResponse(props.applyUnsupportedMediaType),

    ApiInternalServerErrorResponse({ type: ServerError }),
  );
}

function applyOkResponse(type?: any) {
  return type ? ApiOkResponse({ type }) : () => {};
}

function applyCreatedResponse(type?: any) {
  return type ? ApiCreatedResponse({ type }) : () => {};
}

function applyBadRequestResponse(apply?: any) {
  return apply ? ApiBadRequestResponse({ type: ClientError }) : () => {};
}

function applyNotFoundResponse(apply?: any) {
  return apply ? ApiNotFoundResponse({ type: ServerError }) : () => {};
}

function applyConflictResponse(apply?: any) {
  return apply ? ApiConflictResponse({ type: ServerError }) : () => {};
}

function applyUnsupportedMediaTypeResponse(apply?: any) {
  return apply ? ApiUnsupportedMediaTypeResponse({ type: ServerError }) : () => {};
}
