import { TestBed } from '@angular/core/testing';

import { LoginInterceptor } from './login-interceptor.service';

describe('LoggingIntercetorService', () => {
  let service: LoginInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
