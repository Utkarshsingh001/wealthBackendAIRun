import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Prisma } from '../../prisma/generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter
    implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const errorMap: Record<
            string,
            { status: number; message: string | ((meta?: any) => string) }
        > = {
            P1000: { status: HttpStatus.UNAUTHORIZED, message: 'Authentication failed against the database' },
            P1001: { status: HttpStatus.SERVICE_UNAVAILABLE, message: 'Database server not reachable' },
            P1002: { status: HttpStatus.REQUEST_TIMEOUT, message: 'Database operation timed out' },
            P1003: { status: HttpStatus.NOT_FOUND, message: 'Database does not exist' },
            P1008: { status: HttpStatus.REQUEST_TIMEOUT, message: 'Operation timed out' },
            P1009: { status: HttpStatus.CONFLICT, message: 'Database already exists' },
            P1010: { status: HttpStatus.FORBIDDEN, message: 'Access denied to database' },
            P1011: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'TLS connection error' },
            P1012: { status: HttpStatus.BAD_REQUEST, message: 'Schema validation error' },
            P1013: { status: HttpStatus.BAD_REQUEST, message: 'Invalid Prisma schema' },
            P1014: { status: HttpStatus.GONE, message: 'Database has been deleted' },
            P1015: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to create database' },
            P1016: { status: HttpStatus.BAD_REQUEST, message: 'Raw query failed' },

            P2000: { status: HttpStatus.BAD_REQUEST, message: 'Value too long for field' },
            P2001: { status: HttpStatus.NOT_FOUND, message: 'Record not found' },
            P2002: {
                status: HttpStatus.CONFLICT,
                message: (meta) => `Unique constraint failed on field(s): ${meta?.target?.join(', ')}`,
            },
            P2003: {
                status: HttpStatus.BAD_REQUEST,
                message: (meta) => `Foreign key constraint failed on field: ${meta?.field_name || 'unknown'}`,
            },
            P2004: { status: HttpStatus.BAD_REQUEST, message: 'Constraint failed on the database' },
            P2005: { status: HttpStatus.BAD_REQUEST, message: 'Invalid value for field' },
            P2006: { status: HttpStatus.BAD_REQUEST, message: 'Missing required value' },
            P2007: { status: HttpStatus.BAD_REQUEST, message: 'Invalid data' },
            P2008: { status: HttpStatus.BAD_REQUEST, message: 'Failed to parse query' },
            P2009: { status: HttpStatus.BAD_REQUEST, message: 'Query validation error' },
            P2010: { status: HttpStatus.BAD_REQUEST, message: 'Raw query failed' },
            P2011: { status: HttpStatus.BAD_REQUEST, message: 'Null constraint failed' },
            P2012: { status: HttpStatus.BAD_REQUEST, message: 'Missing required argument' },
            P2013: { status: HttpStatus.BAD_REQUEST, message: 'Missing required arguments in relation' },
            P2014: { status: HttpStatus.CONFLICT, message: 'Inconsistent relationship' },
            P2015: { status: HttpStatus.NOT_FOUND, message: 'Related record not found' },
            P2016: { status: HttpStatus.BAD_REQUEST, message: 'Query interpretation error' },
            P2017: { status: HttpStatus.BAD_REQUEST, message: 'Records not connected' },
            P2018: { status: HttpStatus.BAD_REQUEST, message: 'Invalid record reference' },
            P2019: { status: HttpStatus.BAD_REQUEST, message: 'Input error' },
            P2020: { status: HttpStatus.BAD_REQUEST, message: 'Value out of range' },
            P2021: { status: HttpStatus.NOT_FOUND, message: 'Table does not exist' },
            P2022: { status: HttpStatus.NOT_FOUND, message: 'Column does not exist' },
            P2023: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Inconsistent database state' },
            P2024: { status: HttpStatus.REQUEST_TIMEOUT, message: 'Connection pool timeout' },
            P2025: { status: HttpStatus.NOT_FOUND, message: 'Record not found for update/delete' },
            P2026: { status: HttpStatus.CONFLICT, message: 'Nested write conflicts' },
            P2027: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Transaction API error' },
            P2028: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Transaction closed' },
            P2030: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Cannot create a transaction' },
            P2031: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Migration-related error' },
            P2033: { status: HttpStatus.BAD_REQUEST, message: 'Missing field in createMany' },
            P2034: { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Server error from Prisma engine' },
        };

        const code = exception.code;
        const errorEntry = errorMap[code];

        const statusCode = errorEntry?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            typeof errorEntry?.message === 'function'
                ? errorEntry.message(exception.meta)
                : errorEntry?.message || 'Internal server error';

        response.status(statusCode).json({
            statusCode,
            message,
            error: `Prisma error code: ${code}`,
        });
    }
}
