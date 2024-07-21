import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    spyOn(window.localStorage, 'setItem').and.callFake(() => {});
    spyOn(window.localStorage, 'getItem').and.callFake(() => '');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save key and value to localStorage', () => {
    const key = 'testKey';
    const value = { test: 'value' };
    const stringifiedValue = JSON.stringify(value);

    service.saveKeyValue(key, value);

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      key,
      stringifiedValue
    );
  });

  it('should get parsed value from localStorage', () => {
    const key = 'testKey';
    const value = { test: 'value' };
    const stringifiedValue = JSON.stringify(value);
    (window.localStorage.getItem as jasmine.Spy).and.returnValue(
      stringifiedValue
    );

    const result = service.getParsedValue(key);

    expect(result).toEqual(value);
  });

  it('should return an empty string if the key does not exist in localStorage', () => {
    const key = 'nonExistentKey';
    (window.localStorage.getItem as jasmine.Spy).and.returnValue(null);

    const result = service.getParsedValue(key);

    expect(result).toBe('');
  });
});
