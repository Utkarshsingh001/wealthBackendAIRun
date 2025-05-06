import { SetMetadata } from '@nestjs/common';

export const ONLY_AUTH_KEY = 'onlyAuth';
export const OnlyAuth = () => SetMetadata(ONLY_AUTH_KEY, true);