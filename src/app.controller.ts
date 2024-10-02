import { Body, Controller, Get, HttpRedirectResponse, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { BankAccount } from './Adatok';
import { OpenAccountDto } from './OpenAccount.dto';
import { Response } from 'express';
import { error } from 'console';

@Controller()
export class AppController {
  #bankAccounts: BankAccount[] = [
    {
        id: "100123456789",
        balance: 5000.75,
        owner: "John Doe",
        createdAt: new Date("2022-01-15")
    },
    {
        id: "100987654321",
        balance: 10000.00,
        owner: "Jane Smith",
        createdAt: new Date("2021-06-30")
    },
    {
        id: "100567890123",
        balance: 2500.50,
        owner: "Alice Johnson",
        createdAt: new Date("2023-03-20")
    },
    {
        id: "100345678901",
        balance: 7500.35,
        owner: "Michael Lee",
        createdAt: new Date("2020-11-12")
    },
    {
        id: "100234567890",
        balance: 15000.00,
        owner: "Sophia Davis",
        createdAt: new Date("2022-05-05")
    },
    {
        id: "100876543210",
        balance: 3200.00,
        owner: "James Miller",
        createdAt: new Date("2019-08-19")
    },
    {
        id: "100135792468",
        balance: 9200.75,
        owner: "Olivia Taylor",
        createdAt: new Date("2021-03-22")
    },
    {
        id: "100975310246",
        balance: 4300.00,
        owner: "Liam Brown",
        createdAt: new Date("2023-09-10")
    }
  ];
  constructor(private readonly appService: AppService) {}

  @Get('openAccount')
  @Render('openAccountForm')
  openAccountForm(){
    return{
      data:{},
      errors:[]
    }
  }

  @Post("openAccount")
  openAccount(
    @Body() openAccountDto:OpenAccountDto,
    @Res() response: Response  
  ){
    let errors=[];

    if(!openAccountDto.id||
      !openAccountDto.balance||
      !openAccountDto.owner
    ){
      errors.push("Minden mezőt kitölteni")
    }
    if(!/^\d\d\d\d-\d\d\d\d$/.test(openAccountDto.id)){
      errors.push("format: 0000-0000")
    }
    else{
      const acc=this.#bankAccounts.find(acc=>acc.id==openAccountDto.id);
      if(acc!=undefined)
      {
        errors.push("letezik OOP feladat");
      }
    }
    let balance=parseInt(openAccountDto.balance);
    if(balance<0){
      errors.push("Az egyenleg negatív");
    }
    if(errors.length>0){
      response.render("openAccountForm", {
        data: openAccountDto,
        errors
      })
    }
    const newAccount: BankAccount={
      id: openAccountDto.id,
      owner: openAccountDto.owner,
      balance: parseInt(openAccountDto.balance),
      createdAt: new Date()
    }
    this.#bankAccounts.push(newAccount);
    return response.redirect("/openAccountSuccess")
  }

  @Get("openAccountSuccess")
  openAccountSuccess(){
    return "Fasza"
  }
  }
