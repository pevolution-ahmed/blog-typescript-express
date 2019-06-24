/* A data transfer object (DTO) is an object that 
carries data between processes. The motivation for its use is 
that communication between processes is usually done resorting
to remote interfaces (e.g., web services), where each call is
an expensive operation.


the difference between data transfer objects
and business objects or data access objects is that a DTO does 
not have any behavior except for storage, retrieval,
serialization and deserialization of its own data 
(mutators, accessors, parsers and serializers).
In other words, DTOs are simple objects that should not
contain any business logic but may contain serialization and
deserialization mechanisms for transferring data over the wire.

Remmeber that DTO classes used for validation 
*/
import { IsString } from 'class-validator';
 
class CreatePostDto {
  @IsString()
  public author: string;
 
  @IsString()
  public content: string;
 
  @IsString()
  public title: string;
}
 
export default CreatePostDto;