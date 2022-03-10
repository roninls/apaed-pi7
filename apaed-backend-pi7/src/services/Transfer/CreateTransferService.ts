import { getCustomRepository } from 'typeorm';
import TransferRepository from '../../repositories/TransferRepository';
import Transfer from '../../models/Transfer';
import ProductLocalDonationRepository from '../../repositories/ProductLocalDonationRepository';
import CreateTransferProductLocalDonationService from '../TransferProductLocalDonation/CreateTransferProductLocalDonationService';

interface IRequestDTO {
  origin_id: string;
  destiny_id: string;
  product_id: string;
  product_name: string;
  product_brand: string;
  product_ncm_code: string;
  description: string;
  expiration_date: string;
  active: boolean;
  total_amount_transfered: number;
}

class CreateTransferService {
  public async execute({
    origin_id,
    description,
    destiny_id,
    product_id,
    product_name,
    product_brand,
    product_ncm_code,
    active,
    expiration_date,
    total_amount_transfered,
  }: IRequestDTO): Promise<Transfer | undefined> {
    const transfersRepository = getCustomRepository(TransferRepository);
    const productLocalDonationRepository = getCustomRepository(
      ProductLocalDonationRepository,
    );
    const createTransferProductLocalDonation = new CreateTransferProductLocalDonationService();

    let transfer: Transfer;
    try {
      const productsToTransfer = await productLocalDonationRepository.find({
        where: {
          local_id: origin_id,
          expiration_date,
          product_id,
        },
      });
      const newTransfer = await transfersRepository.create({
        origin_id,
        description,
        destiny_id,
        product_name,
        product_brand,
        product_ncm_code,
        active,
        total_amount_transfered,
      });
      await transfersRepository.save(newTransfer);
      transfer = newTransfer;
      for (let i = 0; i < total_amount_transfered; i++) {
        await productLocalDonationRepository.update(
          {
            id: productsToTransfer[i].id,
          },
          {
            local_id: destiny_id,
          },
        );
        await createTransferProductLocalDonation.execute({
          transfer_id: transfer.id,
          product_local_donation_id: productsToTransfer[i].id,
        });
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
    return transfer;
  }
}

export default CreateTransferService;
