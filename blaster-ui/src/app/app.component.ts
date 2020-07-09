import { Component, OnInit } from "@angular/core";
import { Donation } from "./model/donation";
import { FormControl, FormGroup } from "@angular/forms";
import { DonationStatus } from "./model/enums";
import data from "./donation_details.json";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  donations: Donation[];
  donation: Donation;
  donorDetailsForm: FormGroup;
  showDetails: boolean = false;
  start: number;
  end: number;

  ngOnInit(): void {
    // TODO: Update static values from database fetch.
    this.donations = JSON.parse(JSON.stringify(data));
    console.log("Donations: " + JSON.stringify(this.donations));
    this.start = 0;
    this.end =
      this.donations.length > 10 ? this.start + 10 : this.donations.length;
  }

  selectDonation(donation: Donation) {
    this.donation = donation;

    this.donorDetailsForm = new FormGroup({
      donorAadhar: new FormControl(donation.donorAadhar),
      donorName: new FormControl(donation.donorName),
      bloodGroup: new FormControl(donation.bloodGroup),
      donationDate: new FormControl(donation.donationDate),
      donorStatus: new FormControl(donation.donorStatus),
      donorMobileNumber: new FormControl(donation.donorMobileNumber),
      donorEmail: new FormControl(donation.donorEmail),
      donationStatus: new FormControl(donation.donationStatus),
    });
    this.showDetails = true;
  }

  approve() {
    this.donorDetailsForm.patchValue({
      donationStatus: DonationStatus.APPROVED,
    });
    this.donation = this.donorDetailsForm.value as Donation;
    console.log("Updated donation: " + JSON.stringify(this.donation));
  }

  reject() {
    this.donorDetailsForm.patchValue({
      donationStatus: "Rejected",
    });
  }

  previous() {
    this.start -= 10;
    this.end -= 10;
  }

  next() {
    this.start += 10;
    this.end =
      this.end + 10 > this.donations.length
        ? this.donations.length
        : this.end + 10;
  }
}
