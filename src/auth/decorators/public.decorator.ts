// This decorator can be used to mark routes as public, meaning they do not require authentication.
// It sets a metadata key 'isPublic' to true, which can be checked in guards or interceptors to bypass authentication checks.
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);