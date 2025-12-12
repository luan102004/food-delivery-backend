import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeolocationService {
  async geocode(address: string) {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
    const res = await axios.get(url);
    const loc = res.data.results?.[0]?.geometry?.location;
    return loc ? { lat: loc.lat, lng: loc.lng } : null;
  }
}
