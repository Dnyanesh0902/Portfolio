import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private http: HttpClient) {}

  // Loader & messages
  isLoading = false;
  successMsg = '';
  errorMsg = '';

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitForm() {
    this.successMsg = '';
    this.errorMsg = '';

    if (!this.formData.name || !this.formData.email || !this.formData.subject || !this.formData.message) {
      this.errorMsg = "Please fill all fields!";
      return;
    }

    this.isLoading = true;

    const apiUrl = 'https://localhost:7182/api/Contact';

    this.http.post(apiUrl, this.formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMsg = "Message sent successfully!";
        
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = "Failed to send the message!";
        console.error(err);
      }
    });
  }
}
