import { EntityRepository, Repository } from 'typeorm';

import UnitsMeasure from '../models/UnityMeasurement';

@EntityRepository(UnitsMeasure)
class UnitsMeasureRepository extends Repository<UnitsMeasure> {}

export default UnitsMeasureRepository;
