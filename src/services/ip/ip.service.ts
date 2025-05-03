import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IpService {
  async getCountryFromIp(ip: string): Promise<string> {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      return response.data.country_name || 'Unknown';
    } catch (error) {
      console.error('Error fetching country from IP:', error);
      return 'Unknown';
    }
  }
}