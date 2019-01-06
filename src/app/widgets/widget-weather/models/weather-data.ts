export class Wind {
    public chill?: number;
    public direction?: number;
    public speed?: number;
}

export class Atmosphere {
    public humidity?: number;
    public pressure?: number;
}

export class Astronomy {
    public sunrise?: string;
    public sunset?: string;
}

export class Unit {
    public distance?: string;
    public pressure?: string;
    public speed?: string;
    public temperature?: string;
}

export class WeatherData {
    public day: string;
    public temp?: number;
    public high?: number;
    public low?: number;
    public conditionCode: number;
    public condition: string;
    public tempType?: number;
    public wind?: Wind;
    public atmosphere?: Atmosphere;
    public astronomy?: Astronomy;
    public unit?: Unit;
}

