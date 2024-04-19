import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, NgbNavModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  active = 1;
  member:Member | undefined;
  images:GalleryItem[] = [];

  // route nesnesi, kullanıcı ilgili linke tıkladığında kullanıcının ilgili yere gitmesini sağlar.
  constructor(private memberService:MembersService, private route:ActivatedRoute){}

  loadMember(){
    // Aşağıdaki işlemde tıklanılan route'nin bir snapshot'ı alınır ve snapshot'taki username parametresi seçilir. Bu username parametresi app.routes.ts'de belirtilen child parametre ile aynı olmalıdır.
    const username = this.route.snapshot.paramMap.get('username');

    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member,
        this.getImages();
      }
    });
  }

  getImages(){
    if(!this.member) return;

    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }

  ngOnInit(): void {
    this.loadMember();
  }
}
