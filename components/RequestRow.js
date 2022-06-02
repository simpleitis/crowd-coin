import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function RequestRow(props) {
  const router = useRouter();

  const onApprove = async () => {
    const campaign = Campaign(props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(props.id).send({
      from: accounts[0],
    });

    router.replace(`/campaigns/requests/${props.address}`);
  };

  const onFinalize = async () => {
    const campaign = Campaign(props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0],
    });

    router.replace(`/campaigns/requests/${props.address}`);
  };

  const { id, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{request.description}</TableCell>
      <TableCell>{web3.utils.fromWei(request.value, 'ether')}</TableCell>
      <TableCell>{request.recipient}</TableCell>
      <TableCell>
        {request.approvalCount}/{approversCount}
      </TableCell>

      <TableCell>
        {request.complete ? null : (
          <Button variant="outlined" color="primary" onClick={onApprove}>
            Approve
          </Button>
        )}
      </TableCell>
      <TableCell>
        {request.complete ? null : (
          <Button variant="contained" color="success" onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
