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

    ApiInternalServerErrorResponse({ type: ServerError, description: 'Internal Server Error' }),
  );
}

function applyOkResponse(type?: any) {
  return type ? ApiOkResponse({ type, description: 'OK' }) : () => {};
}

function applyCreatedResponse(type?: any) {
  return type ? ApiCreatedResponse({ type, description: 'Created' }) : () => {};
}

function applyBadRequestResponse(apply?: boolean) {
  return apply ? ApiBadRequestResponse({ type: ClientError, description: 'Bad Request' }) : () => {};
}

function applyNotFoundResponse(apply?: boolean) {
  return apply ? ApiNotFoundResponse({ type: ServerError, description: 'Not Found' }) : () => {};
}

function applyConflictResponse(apply?: boolean) {
  return apply ? ApiConflictResponse({ type: ServerError, description: 'Conflict' }) : () => {};
}

function applyUnsupportedMediaTypeResponse(apply?: boolean) {
  return apply ? ApiUnsupportedMediaTypeResponse({ type: ServerError, description: 'Unsupported Media Type' }) : () => {};
}
