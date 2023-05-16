import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnimalDto } from './dtos/create-animal.dto';
import { UpdateAnimalDto } from './dtos/update-animal.dto';
import { AnimalRepository } from './repositories/animal.repository';

@Injectable()
export class AnimalService {
  constructor(private readonly repository: AnimalRepository) {}

  async create({
    profile_photo,
    name,
    owner,
    specie,
    gender,
    type,
    weight,
    physical_shape,
    entry_date,
    departure_date,
  }: CreateAnimalDto) {
    if (profile_photo && !profile_photo.startsWith('data:image/png;base64')) {
      throw new BadRequestException('Invalid file format.');
    }

    return await this.repository.create({
      profile_photo,
      name,
      owner,
      specie,
      gender,
      type,
      weight,
      physical_shape,
      entry_date,
      departure_date,
    });
  }

  async findAll() {
    return await this.repository.getAll();
  }

  async filterByAnimalType(animalType: string) {
    return await this.repository.filterByAnimalType(animalType);
  }

  async findOne(id: string) {
    const animal = await this.repository.findById(id);

    if (!animal) {
      throw new NotFoundException('Not found animal.');
    }

    return animal;
  }

  async update(
    id: string,
    {
      profile_photo,
      name,
      owner,
      specie,
      gender,
      type,
      weight,
      physical_shape,
      entry_date,
      departure_date,
    }: UpdateAnimalDto,
  ) {
    const animal = await this.repository.findById(id);

    if (!animal) {
      throw new NotFoundException('Not found animal.');
    }

    return await this.repository.update(id, {
      profile_photo,
      name,
      owner,
      specie,
      gender,
      type,
      weight,
      physical_shape,
      entry_date,
      departure_date,
    });
  }

  async remove(id: string) {
    const animal = await this.repository.findById(id);

    if (!animal) {
      throw new NotFoundException('Not found animal.');
    }

    return await this.repository.delete(id);
  }
}
