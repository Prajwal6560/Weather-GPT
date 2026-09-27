export interface WeatherCodeInfo {
  code: number;
  description: string;
  icon: string;
  isRain: boolean;
  isSevere: boolean;
}

export function decodeWmoWeather(code: number): WeatherCodeInfo {
  switch (code) {
    case 0:
      return { code, description: 'Clear Sky', icon: 'Sun', isRain: false, isSevere: false };
    case 1:
      return { code, description: 'Mainly Clear', icon: 'SunMedium', isRain: false, isSevere: false };
    case 2:
      return { code, description: 'Partly Cloudy', icon: 'CloudSun', isRain: false, isSevere: false };
    case 3:
      return { code, description: 'Overcast', icon: 'Cloud', isRain: false, isSevere: false };
    case 45:
    case 48:
      return { code, description: 'Fog / Depositing Rime Fog', icon: 'CloudFog', isRain: false, isSevere: false };
    case 51:
      return { code, description: 'Light Drizzle', icon: 'CloudDrizzle', isRain: true, isSevere: false };
    case 53:
      return { code, description: 'Moderate Drizzle', icon: 'CloudDrizzle', isRain: true, isSevere: false };
    case 55:
      return { code, description: 'Dense Drizzle', icon: 'CloudDrizzle', isRain: true, isSevere: false };
    case 61:
      return { code, description: 'Slight Rain', icon: 'CloudRain', isRain: true, isSevere: false };
    case 63:
      return { code, description: 'Moderate Rain', icon: 'CloudRain', isRain: true, isSevere: false };
    case 65:
      return { code, description: 'Heavy Rain', icon: 'CloudRainWind', isRain: true, isSevere: true };
    case 71:
    case 73:
    case 75:
      return { code, description: 'Snow Fall', icon: 'CloudSnow', isRain: false, isSevere: false };
    case 80:
      return { code, description: 'Slight Rain Showers', icon: 'CloudRain', isRain: true, isSevere: false };
    case 81:
      return { code, description: 'Moderate Rain Showers', icon: 'CloudRain', isRain: true, isSevere: false };
    case 82:
      return { code, description: 'Violent Rain Showers', icon: 'CloudRainWind', isRain: true, isSevere: true };
    case 95:
      return { code, description: 'Thunderstorm', icon: 'CloudLightning', isRain: true, isSevere: true };
    case 96:
    case 99:
      return { code, description: 'Severe Thunderstorm with Hail', icon: 'CloudLightning', isRain: true, isSevere: true };
    default:
      return { code, description: 'Variable Weather', icon: 'Cloud', isRain: false, isSevere: false };
  }
}
