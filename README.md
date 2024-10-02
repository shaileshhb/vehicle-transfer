# Vehicle Transfer Application

## Models

### User
- `id`: uuid
- `firstName`: string
- `lastName`: string
- `email`: string
- `password`: string

### Vehicle
- `id`: uuid
- `vehicleNumber`: string
- `vehicleType`: string
- `pucCertificate`: string
- `insuranceCertificate`: string

### VehicleTracking
- `id`: uuid
- `userId`: uuid
- `vehicleId`: uuid

### VehicleTrackingHistory
- `id`: uuid
- `vehicleId`: uuid
- `transferredToUserId`: uuid
- `transferredFromUserId`: uuid
- `transferredOn`: datetime


## File handling
- File handling on production server could  be implemented using file uploads from frontend to file storage and the link could be put into db which then can be retrieved using the link.
- There is alternative of using blob storage but I find it has a not good approach because of the size of data that it creates. This will make our gets slower and will result in performance issues.
- Currently I have not implemented this feature has it requires a file storage and I don't have any access to the same and using blob storage does not really make sense to me because of the size of data so I didn't want to implement it.

## Future Expansion
- To implement the transfer of vehicle to entity, I would make following modifications

## Company
- `id`: uuid
- `companyName`: string
- `website`: string

### Entity
- `id`: uuid (this id should be same as either userId or companyId)
- `type`: string (user, company)

### VehicleTracking
- `id`: uuid
- `entityId`: uuid
- `vehicleId`: uuid

### VehicleTrackingHistory
- `id`: uuid
- `vehicleId`: uuid
- `transferredToEntityId`: uuid
- `transferredFromEntityId`: uuid
- `transferredOn`: datetime

### Explanation
- Entity tables `id` column would same as either `userId` or `companyId`. This makes fetching data a lot easier by reducing a `GET` operation and also I would not required `userId` and `companyId` column in entities table.
- `userId` in all referenced tables will be replaced with `entityId` and everything should be same.