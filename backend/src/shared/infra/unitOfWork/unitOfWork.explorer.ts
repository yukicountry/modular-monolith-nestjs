import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { UNIT_OF_WORK } from './unitOfWork.decorator';
import { UnitOfWorkProvider } from './unitOfWork.provider';

@Injectable()
export class UnitOfWorkExplorer implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private unitOfWorkProvider: UnitOfWorkProvider,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
  ) {}

  onModuleInit(): void {
    this.explore();
  }

  explore(): void {
    const instanceWrappers: InstanceWrapper[] =
      this.discoveryService.getProviders();

    instanceWrappers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      if (!instance) {
        return;
      }

      // scanFromPrototype will iterate through all providers' methods
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodName: string) => this.lookupProviderMethod(instance, methodName),
      );
    });
  }

  lookupProviderMethod(
    instance: Record<string, (arg: unknown) => Promise<void>>,
    methodName: string,
  ) {
    const methodRef = instance[methodName];
    const isPointCutSet = this.reflector.get<string[]>(UNIT_OF_WORK, methodRef);

    if (!isPointCutSet) {
      return;
    }

    this.unitOfWorkProvider.attach(instance, methodName);
  }
}
