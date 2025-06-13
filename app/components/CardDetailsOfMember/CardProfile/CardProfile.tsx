import Image from 'next/image';
import React from 'react'
import "./CardProfile.css"

interface Iprops{
    imageUrl:string;
    FirstName:string;
    LastName:string;
    email:string;
    completedLessons?: number;
    tasksCount?: number;
    role:string
}

const CardProfile = ({imageUrl, email, FirstName, LastName, completedLessons = 0, tasksCount = 0, role }:Iprops) => {
    // Default profile image URL - using UI Avatars for a more beautiful default avatar
    const defaultProfileImage = `https://ui-avatars.com/api/?name=${FirstName}+${LastName}&background=6366f1&color=fff&size=200&font-size=0.4&bold=true`;
    
    return (
        <div className="card-client">
            <div className="user-picture">
                <Image
                    src={imageUrl || defaultProfileImage}
                    alt={`${FirstName}'s profile`} 
                    fill
                    className="object-cover"
                    onError={(e) => {
                        // If the image fails to load, use the default profile image
                        const target = e.target as HTMLImageElement;
                        target.src = defaultProfileImage;
                    }}
                />
            </div>
            <div className="user-info">
                <h2 className="name-client">
                    {FirstName} {LastName}
                </h2>
                <p className="email-client">{email}</p>
            </div>
            <div className="profile-summary-row">
                <div className="summary-item">
                    <span className="summary-label">Lessons</span>
                    <span className="summary-value">{completedLessons}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Tasks</span>
                    <span className="summary-value">{tasksCount}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Role</span>
                    <span className={`status-badge}`}>{role}</span>
                </div>
            </div>
        </div>
    )
}

export default CardProfile