import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-map',
    standalone: true,
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    imports: [HttpClientModule, CommonModule]
})
export class MapComponent {
    countryInfo: any;

    constructor(private http: HttpClient) { }


    onCountryHover(event: MouseEvent) {
        const target = event.target as SVGElement;
        const countryCode = target.getAttribute('id');

        if (countryCode) {
            this.getCountryInfo(countryCode);
        }

        console.log(countryCode)
    }

    private getCountryInfo(countryCode: string) {
        this.http.get(`http://api.worldbank.org/v2/country/${countryCode}?format=json`)
            .subscribe((data: Object) => {
                if (data instanceof Array && data.length > 1 && data[1].length > 0) {
                    const countryData = data[1][0];
                    this.countryInfo = {
                        name: countryData.name,
                        capital: countryData.capitalCity,
                        region: countryData.region.value,
                        incomeLevel: countryData.incomeLevel.value,
                        longitude: countryData.longitude,
                        latitude: countryData.latitude
                    };                    
                }
  
            });
    }
}